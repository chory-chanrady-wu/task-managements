type Props = {
  title: string;
  value: number;
  change: string;
};

export default function StatCard({ title, value, change }: Props) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
      <p className="text-green-600 text-sm mt-2">{change} from last week</p>
    </div>
  );
}
