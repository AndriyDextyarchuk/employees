import { useEffect } from "react";
import { BitrhList } from "../components/BirthsList";
import { List } from "../components/List";
import { fetchEmployees } from "../redux/employeesSlice";
import { useAppDispatch } from "../redux/hooks";

import styles from "./EmployeesPage.module.css";

export function EmployeesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  return (
    <section className={styles.container}>
      <List />
      <BitrhList />
    </section>
  );
}
