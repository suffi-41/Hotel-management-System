const DetailRow = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <label className="text-sm text-gray-500">{label}</label>
    <p className="font-medium">{value}</p>
  </div>
);

export default DetailRow;

