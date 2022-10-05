import React, { useEffect, useRef, useState } from "react";
const Prompt = ({ getAnswer, answer, prompt, setPrompt }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (answer) {
      textareaRef.current.value += `\n${answer.trim()}`;
    }
  }, [answer]);

  return (
    <>
      <h1 className="prompt-header">Ask-AI</h1>
      <h2 className="prompt-subheader">
        Enter a question and the AI will try to answer it.
      </h2>

      <textarea
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        ref={textareaRef}
      ></textarea>
      <button onClick={() => getAnswer(prompt)}>Submit</button>
    </>
  );
};

export default Prompt;
