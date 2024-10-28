import './Assignment3.css';

const Assignment3 = () => {
  const obj = {
    id: '10002',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with our durable, eco-friendly water bottle.',
    price: 14.99,
    currency: 'USD',
    imageURL: 'https://example.com/images/product-10002.jpg',
  };

  const entries = Object.entries(obj).reduce((acc, [key, value], index) => {
    acc.push({ key, value, position: index });
    return acc;
  }, []);

  return (
    <div className='object'>
      <h1>Object Information</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ key, value, position }) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
              <td>{position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignment3;
