import { Button , Card, Flex, Grid} from "antd";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { getDogs } from "./api/dogs";

function App() {
  const {data: dogs} = useQuery({ queryKey: ["dogs"], queryFn: getDogs });
  
  return <div>
    <h1>Dogs</h1>
    <Flex gap={12} vertical>
      {dogs?.map((dog) => (
        <Card key={dog.id} title={dog.name}>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
        </Card>
      ))}
    </Flex>
  </div>;
}

export default App;
