import React, { Component } from 'react';
import ToDoInput from '../../components/todo-input/todo-input';
import ToDoList from '../../components/todo-list/todo-list';
import Footer from '../../components/footer/footer';
import { connect } from 'react-redux'
import { addTask, removeTask, completeTask, changeFilter } from '../../actions/actionsCreator'

import './todo.css';


class ToDo extends Component {

  state = {
    taskText: ''
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState(
      { taskText: value }
    )
  }

  addTask = ({ key }) => {
    const { taskText } = this.state;
    const { addTask } = this.props;
    if (taskText.length !== 0 && key === 'Enter') {
      addTask((new Date()).getTime(), taskText, false)
      this.setState({
        taskText: ''
      })
    }
  }

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted)

      case 'active':
        return tasks.filter(task => !task.isCompleted)

      default:
        return tasks

    }
  }
  getActiveTaskCounter = tasks => tasks.filter(task => !task.isCompleted).length

  render() {
    const { taskText } = this.state;
    const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTask = this.filterTasks(tasks, filters)
    const taskCount = this.getActiveTaskCounter(tasks)


    return (
      <div className="todo-wrapper">
        <ToDoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList tasksList={filteredTask} removeTask={removeTask} completeTask={completeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} amount={taskCount} activeFilter={filters} />}
      </div>
    );
  }
}
const mapStateToProps = ({ tasks, filters }) => ({
  tasks,
  filters
});
const mapDispatchToProps = {
  addTask,
  removeTask,
  completeTask,
  changeFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
