import dataJson from "@/app/dashboard.json";
import { QuestionSet, columns } from "./columns";
import { DataTable } from "./data-table";

export async function getData(): Promise<QuestionSet[]> {
  console.log("Fetching data...");
  let dataTableInfo: QuestionSet[] = [];

  for (let i = 0; i < dataJson["MCQ-sets"].length; i++) {
    var correct = 0;
    const MCQSetContent = dataJson["MCQ-sets"][i];

    for (let index = 0; index < MCQSetContent.MCQs.length; index++) {
      if (
        MCQSetContent.MCQs[index].correct === MCQSetContent.MCQs[index].chosen
      )
        correct++;
    }

    let MCQSetJson: QuestionSet = {
      title: MCQSetContent.metadata.title,
      id: MCQSetContent.metadata.ID,
      type: MCQSetContent.metadata.subject,
      date: new Date(
        MCQSetContent.metadata.date.year,
        MCQSetContent.metadata.date.month - 1,
        MCQSetContent.metadata.date.day
      ),
      accuracy: correct,
      question: MCQSetContent.MCQs[i]?.question || "", // Get the first question, adjust if needed
      options: Object.values(MCQSetContent.MCQs[i]?.choices || {}), // Get the choices as an array
      "set-size": MCQSetContent.MCQs.length
    };

    console.log("MCQSetJson:", MCQSetJson);

    dataTableInfo.push(MCQSetJson);
  }

  console.log("Data fetched:", dataTableInfo);

  return dataTableInfo;
}

// export async function fetchTable() {
//   const data = await getData();
//   console.log("Fetched Data:", data);
//   return <DataTable columns={columns} data={data} />;
// }

export const data = getData();
export const todayDate = new Date(Date.now());
export const weekData: QuestionSet[] = [];
export const lastWeekData: QuestionSet[] = [];
export const monthData: QuestionSet[] = [];
export const yearData: QuestionSet[] = [];
