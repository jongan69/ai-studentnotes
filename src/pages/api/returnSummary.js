
const generateReadMe = async ({
  student,
  projectName,
  notes
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
          prompt: `Use the Following notes about a student and their project to return me a well formatted and descriptive summary of the lesson: 
          student Name: ${student},
          Student Project: ${projectName},
          Notes about project: ${notes}`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    console.log('AI Response: ', data);

    if (!data?.error) {
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
  const {
    student,
    projectName,
    notes
  } = req.body;

  console.log('Notes for student: ', notes)
  const answer = await generateReadMe({
    student,
    projectName,
    notes
  });

  res.status(200).json({
    answer,
  });
}
