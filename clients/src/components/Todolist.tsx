import { Button, Checkbox, Input } from '@mui/joy'
import React from 'react'
import publicAxios from '../axios/publicAxios'
import privateAxios from '../axios/privateAxios'

interface Todolist1 {
    id: number
    todoName: string
    status: boolean
}

function Todolist() {
    const [newTodo, setNewTodo] = React.useState({
        todoName: ""
    })
    const [data, setData] = React.useState([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }

    const handleAdd = async () => {

        const res = await publicAxios.post("/api/v1/todo", { ...newTodo })
        setData(res.data)
        setNewTodo({
            todoName: ""
        })
    }

    const handleGetTodo = async () => {
        try {
            const res = await publicAxios.get("/api/v1/todo");
            setData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await publicAxios.delete(`/api/v1/todo/${id}`)
            setData(res.data.todo)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeStatus = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const status = e.target.checked
        console.log(status)
        const res = await publicAxios.put(`/api/v1/todo/${id}`, { status })
        setData(res.data.todo)
    }
    console.log(data)

    React.useEffect(() => {
        handleGetTodo()
    }, [])

  return (
      <div>
          <div className='w-1/3 min-h-64 rounded-xl bg-[#ff6b6b] drop-shadow-lg m-auto mt-28 text-white'>
              <h1 className='ml-6 text-3xl font-bold pt-6'>Todolist</h1>
              <p className='ml-6'>Get thinks done, one item at a time</p><br />
              <hr className='ml-6 mr-6'/>      
              <div>
                  <ul className='m-6'>
                      {data?.map((item: any, index: number) => (
                          <li key={index} className='text-lg font-semibold flex items-center justify-between mt-3'>
                              <div className='flex items-center gap-3'>
                                  {item.todoName}
                              </div>
                              <div className='flex gap-3'>
                                <Checkbox label="" variant="soft" defaultChecked checked={item.status} onChange={(e) => handleChangeStatus(e, item.id)} />
                                <Button variant="soft" className='w-[70px] h-9 ml-5' onClick={() => handleDelete(item.id)}>Delete</Button>           
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
                <div className='flex m-auto justify-evenly items-center mt-6'>
                        <Input placeholder="Type in here…" variant="outlined" color="neutral" className='w-3/4' onChange={handleChange} name="todoName" value={newTodo.todoName} />
                        <Button variant="soft" className='w-[70px] h-9' onClick={handleAdd}>Add</Button>
                </div>
          </div>
      </div>
  )
}

export default Todolist