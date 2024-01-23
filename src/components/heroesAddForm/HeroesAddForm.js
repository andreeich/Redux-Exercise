// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useFormik } from "formik";
import * as Yup from "yup";
import { heroAdd } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { heroes } = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      name: "",
      text: "",
      element: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Должно быть 15 символов или меньше")
        .required("Обязательно"),
      text: Yup.string()
        .max(50, "Должно быть 50 символов или меньше")
        .required("Обязательно"),
      element: Yup.string().required("Обязательно"),
    }),
    onSubmit: (values) => {
      // find max id
      const maxId = Math.max(...heroes.map((hero) => hero.id));
      dispatch(
        heroAdd({
          ...values,
          id: maxId + 1,
        })
      );
    },
  });

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="fs-5 text-danger mt-2">{formik.errors.name}</p>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          {...formik.getFieldProps("text")}
        />
        {formik.touched.text && formik.errors.text ? (
          <p className="fs-5 text-danger mt-2">{formik.errors.text}</p>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          {...formik.getFieldProps("element")}
        >
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
        {formik.touched.element && formik.errors.element ? (
          <p className="fs-5 text-danger mt-2">{formik.errors.element}</p>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
