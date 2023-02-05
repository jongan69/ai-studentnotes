import { stringify } from "postcss";

const generateReadMe = async ({
  code
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `${code}. Read the code and generate a README.md for it in markdown format. 
          If possible include code usage examples. 
          Make sure all sentences are complete.`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    console.log('AI Response: ', data);

    if(!data?.error){
      return data?.choices[0]?.text;
    } else {
      return data.error.message;
    }
   

  } catch (err) {
    console.error(err);
    return err.toString()
  }
};

export default async function handler(req, res) {
  const { code } = req.body;
  console.log('Code for readme: ', code)
  const answer = await generateReadMe({
    code
  });

  res.status(200).json({
    answer,
  });
}
