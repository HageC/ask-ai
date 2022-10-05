import { useState } from "react";
import Prompt from "./components/Prompt";
function App() {
  const [answer, setAnswer] = useState();
  const [prompt, setPrompt] = useState();

  const getAnswer = (givenPrompt) => {
    if (givenPrompt.length < 0) {
      return;
    }
    const prompt = givenPrompt.replace(/\s\s+/g, " ");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    };

    fetch(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setAnswer(data.choices[0].text.replace(/\s\s+/g, " "));
      })
      .catch((err) => {
        console.log("Ran out of tokens for today! Try tomorrow!");
      });
  };

  return (
    <>
      <Prompt
        getAnswer={getAnswer}
        answer={answer}
        prompt={prompt}
        setPrompt={setPrompt}
      />
    </>
  );
}

export default App;
