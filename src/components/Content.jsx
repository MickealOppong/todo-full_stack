import styled from "styled-components";
import AddTask from "./AddTask";
import { useGlobalContext } from "./AppContextProvider";
import Task from "./Task";
const Content = () => {
  const { projects, id } = useGlobalContext();

  const item = projects.find((project) => {
    return project.id === id
  })
  return <section className="content">
    <Wrapper>

      <div className="content-header">
        <h1>my projects / {item?.name}</h1>
      </div>

      <div className="todo-content">
        <h4 className="project-name">{item?.name}</h4>
        <Task />
        <AddTask />

      </div>
    </Wrapper>

  </section>
}

const Wrapper = styled.div`
  .content-header {
  height: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding-left: 1rem;
}

h1{
  text-transform:capitalize;
}

.project-name{
  font-size:1.5rem;
  text-transform:capitalize;
 color: rgb(73, 81, 81);
}

.todo-content{
  padding-left:1rem;
}
`

export default Content;