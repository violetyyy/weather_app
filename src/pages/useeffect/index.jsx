import { useEffect, useState } from "react";

const UseEffect = () => {
  const [number, setNumber] = useState(1);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${number}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [number]);

  const minusNumber = () => {
    setNumber(number - 1);
  };
  const addNumber = () => {
    setNumber(number + 1);
  };

  return (
    <div>
      UseEffect
      {isLoading ? <Loader /> : <Card post={post} />}
      <div>
        <button onClick={minusNumber}>-</button>
        <h1>{number}</h1>
        <button onClick={addNumber}>+</button>
      </div>
    </div>
  );
};

const Loader = () => {
  return <div>Data unshij baina</div>;
};

const Card = ({ post }) => {
  return (
    <div>
      <div>{post.title}</div>
    </div>
  );
};

export default UseEffect;
