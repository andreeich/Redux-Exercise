// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filtersFetched,
  filtersFetchingError,
  activeFilterSet,
} from "../../actions";
import classNames from "classnames";

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    dispatch(activeFilterSet(e.currentTarget.getAttribute("data-value")));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((filter) => {
            const className = classNames({
              btn: true,
              "btn-outline-dark": filter.type === "all",
              "btn-danger": filter.type === "fire",
              "btn-primary": filter.type === "water",
              "btn-success": filter.type === "wind",
              "btn-secondary": filter.type === "earth",
              active: filter.type === activeFilter,
            });
            return (
              <button
                className={className}
                data-value={filter.type}
                onClick={handleClick}
              >
                {filter.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
