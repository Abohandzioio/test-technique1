import Link from "next/link";

export default function SurveyCard({ survey }: any) {
  return (
    <div className="border rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold">{survey.title}</h2>

      <p className="text-gray-600">{survey.description}</p>

      <p className="text-sm mt-2">{survey.questions.length} questions</p>

      <Link
        href={`/survey/${survey.id}`}
        className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Répondre
      </Link>
    </div>
  );
}
