import { useAppSelector } from "../redux/hooks";
import styles from "./BirthsList.module.css";

export function BitrhList() {
  const activeEmployees = useAppSelector((state) => state.emloyees.list).filter(
    (i) => i.active === true
  );

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getMonthOfBirth(employee) {
    let monthOfBirth = new Date(Date.parse(employee?.dob)).toLocaleDateString(
      "en-US",
      { month: "long" }
    );
    return monthOfBirth;
  }

  function getBirthData(employee) {
    let birthData = new Date(Date.parse(employee?.dob)).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    return birthData;
  }

  let currentMonth = new Date().toLocaleDateString("en-US", { month: "long" });
  let currentMonthIndex = months.indexOf(currentMonth);

  months = [
    ...months.slice(currentMonthIndex),
    ...months.slice(0, currentMonthIndex),
  ];

  months = months.map((month) => [
    month,
    activeEmployees
      .filter((employee) => getMonthOfBirth(employee) === month)
      .sort((a, b) =>
        a.lastName < b.lastName ? -1 : a.lastName > a.lastName ? 1 : 0
      ),
  ]);

  return (
    <aside className={styles.container}>
      <h2>Employees birthday </h2>
      {activeEmployees.length ? (
        <section>
          {months.map((month) => (
            <article key={month[0]}>
              <h3>{month[0]}</h3>
              <ul>
                {month[1].length ? (
                  month[1].map((active) => (
                    <li key={active.id}>
                      <h5>
                        {`
                            ${active.lastName} 
                            ${active.firstName} - 
                            ${getBirthData(active)}
                            year
                          `}
                      </h5>
                    </li>
                  ))
                ) : (
                  <h4>No Employees</h4>
                )}
              </ul>
            </article>
          ))}
        </section>
      ) : (
        <h3>Employees List is empty</h3>
      )}
    </aside>
  );
}
