import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to solve my problem. Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.`;

type DemoBot = Omit<Bot, "session">;

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "1",
    avatar: "1f4f7",
    name: "GPT-4 Vision",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-vision-preview",
      temperature: 0.0,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    hideContext: false,
  },
  // {
  //   id: "2",
  //   avatar: "1f916",
  //   name: "My Documents",
  //   botHello: "Hello! How can I assist you today?",
  //   context: [],
  //   modelConfig: {
  //     model: "gpt-4-1106-preview",
  //     temperature: 0.5,
  //     maxTokens: 4096,
  //     sendMemory: true,
  //   },
  //   readOnly: true,
  //   hideContext: false,
  // },
  // {
  //   id: "3",
  //   avatar: "1f5a5-fe0f",
  //   name: "Red Hat Linux Expert",
  //   botHello: "Hello! How can I help you with Red Hat Linux?",
  //   context: [
  //     {
  //       role: "system",
  //       content: TEMPLATE("Red Hat Linux Expert"),
  //     },
  //   ],
  //   modelConfig: {
  //     model: "gpt-4-1106-preview",
  //     temperature: 0.1,
  //     maxTokens: 4096,
  //     sendMemory: true,
  //   },
  //   readOnly: true,
  //   datasource: "redhat",
  //   hideContext: false,
  // },
  {
    id: "3",
    avatar: "1f916",
    name: "GPT-4 Turbo",
    botHello: "Hello! How can I help you?",
    context: [
      {
        role: "system",
        content:
          "Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.",
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.0,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    //datasource: "___",
    hideContext: true,
  },
  // {
  //   id: "5",
  //   avatar: "1f4da",
  //   name: "German Basic Law Expert",
  //   botHello: "Hello! How can I assist you today?",
  //   context: [
  //     {
  //       role: "system",
  //       content: TEMPLATE("Lawyer specialized in the basic law of Germany"),
  //     },
  //   ],
  //   modelConfig: {
  //     model: "gpt-4-1106-preview",
  //     temperature: 0.1,
  //     maxTokens: 4096,
  //     sendMemory: true,
  //   },
  //   readOnly: true,
  //   datasource: "basic_law_germany",
  //   hideContext: false,
  // },
  {
    id: "4",
    avatar: "1f4dd",
    name: "DemoSim Gen",
    botHello:
      "Hello! How can I assist you today? You can ask me to generate a DemoSim scenario that you describe or upload an existing scenario and have me make updates to it.",
    context: [
      {
        role: "system",
        content: TEMPLATE(
          "BigPanda DemoSim Scenario Expert specialized in generating CSV files representing incident scenarios that are compatible with BigPanda's internal DemoSim tool. Use the provided context for examples of existing scenarios, but draw upon your pre-trained knowledge of system alerts, networking, IT, etc. in order to create realistic alerts to fit the user's requirements. If the user is requesting a new scenario, make it available in CSV form that they can download. In order to generate random numbers that are generated consistently, use the following syntax: ${rnd.ddd} where ddd is a number between 000 and 999. The first column should be @offset which defines the offset from current time for each alert to fire. The second column should be @source which defines the type of monitoring tool that will send the alert, and can be one of the following values: app-mon, log-mon, infra-mon, net-mon, synth-mon, db-mon, cloud-mon, cluster-mon. The rest of the column names should represent the alert fields and should be all lower case with underscores instead of spaces. Each alert must have a 'status' column which is set to warning or critical. Every alert should have a value for 'check' which represents the shorthand description fo the problem like 'CPU Utilization', 'Web Timeouts', 'Increased Error Rates', etc. Additionally, every alert should have a 'host' field defined and you should add random numbers at the end of the host name like this: prod-atl1-web${rnd.ddd}. The rest of the fields you can choose on your own. Do not put spaces in between the different cell values of the CSV. If the user specifies a deisred range of total alerts you should make sure to generate that many alerts in the produced CSV file.",
        ),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.0,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "bigpanda-demosim",
    hideContext: true,
  },
  {
    id: "5",
    avatar: "1f43c",
    name: "GiantPanda",
    botHello:
      "Hello! How can I assist you today? I have vast knowledge of all things BigPanda employees have to deal with including support issues, past incidents and resolutions, and more!",
    context: [
      {
        role: "system",
        content: TEMPLATE(
          "BigPanda AIOps Platform Support Expert with vast knowledge of all things BigPanda employees have to deal with including support issues, past incidents and resolutions, and more.",
        ),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.0,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "bigpanda-giantpanda",
    hideContext: true,
  },
  {
    id: "6",
    avatar: "1f4c4",
    name: "BP Docs",
    botHello:
      "Hello! How can I assist you today? Ask me anything about the BigPanda AIOps platform including general information, technical info, integrations, and BigPanda's APIs!",
    context: [
      {
        role: "system",
        content: TEMPLATE(
          "BigPanda Documentation Expert with vast knowledge of the official BigPanda documentation including all articles, guides, and tutorials as well as knowledge of BigPanda's public APIs.",
        ),
      },
    ],
    modelConfig: {
      model: "gpt-4-1106-preview",
      temperature: 0.0,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "bigpanda-docs",
    hideContext: true,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: true,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
