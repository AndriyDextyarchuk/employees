import { changeStatus } from '../redux/employeesSlice'
import { useAppDispatch } from '../redux/hooks'
import styles from './Card.module.css'

export function Card({ employee }) {
  const dispatch = useAppDispatch()
  const { id, firstName, lastName, active } = employee

  const changeStatusHandler = (e) => {
    dispatch(
      changeStatus({
        id,
        active: e.target.value === 'active' ? true : false,
      })
    )
  }
  return (
    <article className={styles.container}>
      <h4
        className={active ? styles.active : ''}
      >{`${lastName} ${firstName}`}</h4>
      <div className={styles.input}>
        <input
          className={styles.input}
          name={id}
          value="nonActive"
          type="radio"
          id="nonActive"
          checked={active ? false : true}
          onChange={(e) => changeStatusHandler(e)}
        />
        <label htmlFor="nonActive">non active</label>
      </div>
      <div className={styles.input}>
        <input
          className={styles.input}
          name={id}
          value="active"
          type="radio"
          id="active"
          checked={active ? true : false}
          onChange={(e) => changeStatusHandler(e)}
        />
        <label htmlFor="active">active</label>
      </div>
    </article>
  )
}
