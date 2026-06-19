function Divide({ num1, num2, setResult }) {
  const handleDivide = () => {
    if (Number(num2) === 0) {
      setResult("Cannot divide by zero");
    } else {
      setResult(Number(num1) / Number(num2));
    }
  };

  return <button onClick={handleDivide}>Divide</button>;
}

<<<<<<< HEAD
export default Divide;
=======
export default Divide;
>>>>>>> 86f0ddfeba3ee55600bed88e1601efd089ec4139
