import axios from "axios";
import React, { useEffect, useState } from "react";

const AIchat = (props) => {
    const [message, setMessage] = useState("");

    // const send = () => {
    //     axios.post("https://api.openai.com/v1/chat/completions", {
    //         model: "gpt-3.5-turbo",
    //         messages: [{role: "user", content: "hello"}]
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer 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"
    //         }
    //     }).then(response => {
    //         console.log(response.data.choices[0].text);
    //         // Здесь вы можете обработать полученный ответ от API
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // };

    // async function getChatResponse(prompt) {
    //     const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //       prompt: prompt,
    //       max_tokens: 60,
    //       n: 1,
    //       stop: '\n',
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
    //       },
    //     });
    //     return response.data;// .choices[0].text.trim()
    //   }

    const send = async () =>{
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
          prompt: prompt,
          max_tokens: 60,
          n: 1,
          stop: '\n',
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        });
        return response.data;// .choices[0].text.trim()
    }

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={send}>отправить</button>
        </div>
    );
};

export default AIchat;