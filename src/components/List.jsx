import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

import { Card } from "./Card";
import styles from "./List.module.css";

export function List() {
  const employyees = useAppSelector((state) => state.emloyees.list);

  const [list, setList] = useState([]);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let mapedEmployees = [];
    for (let letter of letters) {
      const filtered = employyees
        .filter((i) => i.lastName[0].toUpperCase() === letter)
        .sort((a, b) =>
          a.firstName < b.firstName ? -1 : a.firstName > a.firstName ? 1 : 0
        );
      mapedEmployees.push([letter, filtered]);
    }
    setList(mapedEmployees);
  }, [employyees]);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <section className={styles.letters}>
        {list.map((i) => (
          <article key={i} className={styles.letterList}>
            <h3>{i[0]}</h3>
            <div className={styles.cards}>
              {i[1].length ? (
                i[1].map((employee) => (
                  <Card key={employee.id} employee={employee} />
                ))
              ) : (
                <h3>No Employees</h3>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
