import React, { useMemo } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Parses text containing LaTeX format and renders it appropriately
 * @param {string} text - Text that may contain LaTeX expressions
 * @return {Array} Array of React elements with LaTeX rendered
 */
export const parseLatexContent = (text) => {
  if (!text || typeof text !== 'string') return [<span key="empty"></span>];
  
  // Regular expressions to match inline and block LaTeX
  // Using non-greedy quantifiers and accounting for escaped $ symbols
  const inlineLatexRegex = /(?<![\\])\$((?:\\.|[^\$\\])+?)\$/g;
  const blockLatexRegex = /(?<![\\])\$\$((?:\\.|[^\$\\])+?)\$\$/g;
  
  // Find all matches with their positions
  const matches = [];
  
  // Collect block LaTeX matches
  let blockMatch;
  while ((blockMatch = blockLatexRegex.exec(text)) !== null) {
    matches.push({
      type: 'block',
      start: blockMatch.index,
      end: blockMatch.index + blockMatch[0].length,
      content: blockMatch[1]
    });
  }
  
  // Collect inline LaTeX matches
  let inlineMatch;
  while ((inlineMatch = inlineLatexRegex.exec(text)) !== null) {
    // Check if this inline match overlaps with any block match
    const overlaps = matches.some(m => 
      (inlineMatch.index >= m.start && inlineMatch.index < m.end) ||
      (inlineMatch.index + inlineMatch[0].length > m.start && inlineMatch.index + inlineMatch[0].length <= m.end)
    );
    
    if (!overlaps) {
      matches.push({
        type: 'inline',
        start: inlineMatch.index,
        end: inlineMatch.index + inlineMatch[0].length,
        content: inlineMatch[1]
      });
    }
  }
  
  // Sort matches by their start positions
  matches.sort((a, b) => a.start - b.start);
  
  // Build the result array
  const result = [];
  let lastEnd = 0;
  let counter = 0;
  
  for (const match of matches) {
    // Add text before this match if there is any
    if (match.start > lastEnd) {
      result.push(
        <span key={`text-${counter}`}>
          {text.substring(lastEnd, match.start)}
        </span>
      );
      counter++;
    }
    
    // Add the LaTeX element
    if (match.type === 'inline') {
      try {
        result.push(
          <InlineMath key={`inline-${counter}`} math={match.content} />
        );
      } catch (error) {
        // Fallback if LaTeX parsing fails
        result.push(
          <span key={`inline-error-${counter}`} className="latex-error">
            ${match.content}$
          </span>
        );
      }
    } else {
      try {
        result.push(
          <BlockMath key={`block-${counter}`} math={match.content} />
        );
      } catch (error) {
        // Fallback if LaTeX parsing fails
        result.push(
          <span key={`block-error-${counter}`} className="latex-error">
            $${match.content}$$
          </span>
        );
      }
    }
    counter++;
    lastEnd = match.end;
  }
  
  // Add any remaining text after the last match
  if (lastEnd < text.length) {
    result.push(
      <span key={`text-${counter}`}>
        {text.substring(lastEnd)}
      </span>
    );
  }
  
  return result;
};

/**
 * Memoized component to display LaTeX formatted content
 */
export const LatexContent = React.memo(({ content, className }) => {
  const parsedContent = useMemo(() => parseLatexContent(content), [content]);
  
  return <div className={`latex-content ${className || ''}`}>{parsedContent}</div>;
});

/**
 * Component to display LaTeX formatted question
 */
export const LatexQuestion = ({ question }) => {
  return <LatexContent content={question} className="latex-question" />;
};

/**
 * Component to display LaTeX formatted option
 */
export const LatexOption = ({ option }) => {
  return <LatexContent content={option} className="latex-option" />;
};

/**
 * Component to display a full math problem with question and options
 */
export const MathProblem = ({ problem }) => {
  const { question, options, correctAnswer } = problem;
  
  return (
    <div className="math-problem">
      <div className="question-container">
        <LatexQuestion question={question} />
      </div>
      <div className="options-container">
        {options.map((option, index) => (
          <div 
            key={`option-${index}`} 
            className={`option ${correctAnswer === option ? 'correct-answer' : ''}`}
          >
            <span className="option-label">{String.fromCharCode(65 + index)}. </span>
            <LatexOption option={option} />
          </div>
        ))}
      </div>
    </div>
  );
};