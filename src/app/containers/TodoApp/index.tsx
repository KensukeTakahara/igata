import React, { FC, useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { faListAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { Type as LoginType } from '@/app/actions/login'
import { Type as TodoType } from '@/app/actions/todo'
import { Header } from '@/app/components/Header'
import { TodoItem } from '@/app/components/TodoItem'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Modal } from '@/app/components/Modal'
import { Footer } from '@/app/components/Footer'

import { RootState } from '@/app/models'
import { Todo } from '@/app/models/Todo'
import words from '@/assets/strings'
import style from '@/app/containers/TodoApp/style.scss'

interface StateProps {
  readonly todos: Todo[]
  readonly userId: string
  readonly fetching: boolean
}

const selectState = (state: RootState): StateProps => ({
  todos: state.todoState.todos,
  fetching: state.todoState.fetching,
  userId: state.loginState.userId,
})

const TodoApp: FC = () => {
  const [text, setText] = useState<string>('')
  const [modalHidden, setModalHidden] = useState<boolean>(true)
  const inputElem = useRef<HTMLInputElement>(null)

  const state = useSelector<RootState, StateProps>(selectState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: TodoType.FETCH_TODOS })
  }, [])

  const addTodo = () => {
    if (!text) {
      return
    }
    dispatch({
      type: TodoType.ADD_TODO,
      payload: { text },
    })
    setText('')
    setModalHidden(true)
  }

  const handleFetchTodos = () => dispatch({ type: TodoType.FETCH_TODOS })
  const handleLogout = () => dispatch({ type: LoginType.LOGOUT })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  const handleAddTodoClick = () => addTodo()

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const handleCheckBoxClick = (todo: Todo) =>
    dispatch({
      type: TodoType.UPDATE_TODO,
      payload: { ...todo, done: !todo.done },
    })
  const handleDeleteClick = (todo: Todo) =>
    dispatch({
      type: TodoType.DELETE_TODO,
      payload: todo.id,
    })

  const modalOpen = () => {
    setText('')
    setModalHidden(false)
  }

  const modalClose = () => {
    setText('')
    setModalHidden(true)
  }

  const handleModalLoad = () => {
    if (inputElem.current) {
      inputElem.current.focus()
    }
  }

  return (
    <div className={style.container}>
      <Header title={words.todoApp.title} userId={state.userId} icon={faListAlt} />

      <div>
        <button type="button" className={style.fetchButton} disabled={state.fetching} onClick={handleFetchTodos}>
          {words.todoApp.fetchTodos}
        </button>
        <button type="button" className={style.logoutButton} onClick={handleLogout}>
          {words.todoApp.logout}
        </button>
      </div>
      <button type="button" className={style.addButton} onClick={modalOpen}>
        {words.todoApp.newTodo}
      </button>
      <Modal hidden={modalHidden} onLoad={handleModalLoad} icon={faPlusCircle} name={words.todoApp.newTodo} close={modalClose}>
        <input
          ref={inputElem}
          className={style.inputTodo}
          type="text"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={words.todoApp.placeholder}
          value={text}
        />
        <br />
        <button type="button" className={style.postButton} disabled={!text || state.fetching} onClick={handleAddTodoClick}>
          {words.todoApp.addTodo}
        </button>
      </Modal>

      <ListWrapper loading={state.fetching}>
        {state.todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} handleCheckBoxClick={handleCheckBoxClick} handleDeleteClick={handleDeleteClick} />
        ))}
      </ListWrapper>
      <Footer />
    </div>
  )
}

export default TodoApp
