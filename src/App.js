import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'
import './App.css'

const tagsList = [
  {
    id: uuidv4(),
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    id: uuidv4(),
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    id: uuidv4(),
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    id: uuidv4(),
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    id: uuidv4(),
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    id: uuidv4(),
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeTab: '',
    tasksList: [],
    taskInput: '',
    tagInput: tagsList[0].optionId,
  }

  onTaskInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  onTagInputChange = event => {
    this.setState({tagInput: event.target.value})
  }

  onChangeTag = id => {
    const {activeTab} = this.state
    if (activeTab === id) {
      this.setState({activeTab: ''})
    } else {
      this.setState({activeTab: id})
    }
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state
    const taskDetails = {
      id: uuidv4(),
      task: taskInput,
      tag: tagInput,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, taskDetails],
      taskInput: '',
      tagInput: tagsList[0].optionId,
    }))
  }

  render() {
    const {activeTab, tasksList, taskInput, tagInput} = this.state
    const filteredTasksList = tasksList.filter(eachObj =>
      eachObj.tag.toLowerCase().includes(activeTab.toLowerCase()),
    )
    return (
      <div className="app-container">
        <div className="create-task-container">
          <form className="form" onSubmit={this.onAddTask}>
            <h1 className="create-task-heading">Create a Task!</h1>
            <label htmlFor="task" className="label-styles">
              Task
            </label>
            <input
              id="task"
              type="text"
              value={taskInput}
              placeholder="Enter the task here"
              className="input-styles"
              onChange={this.onTaskInputChange}
            />
            <label htmlFor="tag" className="label-styles">
              Tags
            </label>
            <select
              id="tag"
              value={tagInput}
              className="input-styles"
              onChange={this.onTagInputChange}
            >
              {tagsList.map(eachObj => (
                <option value={eachObj.optionId}>{eachObj.displayText}</option>
              ))}
            </select>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="display-tasks-container">
          <h2 className="title">Tags</h2>
          <ul id="tagsList" className="tags-list">
            {tagsList.map(eachObj => (
              <TagItem
                key={eachObj.id}
                tagDetails={eachObj}
                isActive={eachObj.optionId === activeTab}
                onChangeTag={this.onChangeTag}
              />
            ))}
          </ul>
          <h2 className="title">Tasks</h2>
          {filteredTasksList.length === 0 ? (
            <p className="no-task">No Tasks Added Yet</p>
          ) : (
            <ul id="tasksList" className="tasks-list">
              {filteredTasksList.map(eachObj => (
                <TaskItem key={eachObj.id} taskDetails={eachObj} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
