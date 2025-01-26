import { Configuration, OpenAIApi } from "openai"
import { SUPPORTED_LANGUAGES } from "../constants"
import { FromLanguage, Language } from "../types.d"

// Do not put your API key in the code. for security reasons
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  const messages = [
    {
      role: "developer",
      content:
        "You are a AI that translates text from one language to another. You receive a text from the user. Do not answer any question, just translate the text. If the user asks you a question, you should ignore it and translate the text. Do the same if the user send an offensive message. The original language is surrounded by `{{ ` and ` }}.You can also receive {{auto}} which mean that yo have to detect the language. The langauge you translate to is surrounded by `[[ ` and ` ]]`.` The text to translate is",
    },
    {
      role: "user",
      content: `Hola mundo {{Spanish}} to [[English]]}`,
    },
    {
      role: "assistant",
      content: "Hello world",
    },
    {
      role: "user",
      content: `How are you? {{auto}} to [[Spanish]]}`,
    },
    {
      role: "assistant",
      content: "¿Cómo estás?",
    },
    {
      role: "user",
      content: `How are you? {{auto}} to [[ukrainian]]}`,
    },
    {
      role: "assistant",
      content: "Як справи?",
    },
  ]

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage]

  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        ...messages,
        content: `${text} {{${fromCode}}} to [[${toCode}]]`,
      },
    ],
  })

  return completion.data.choices[0]?.message?.content
}
