import { useEffect, useState } from "react";
import { getCategories } from "@services/events-missions-service";
import RenderEventList from "@components/renderEvents/RenderEventList";
import LoaderMini from "@components/loaders/LoaderMini.jsx";
import "@pages/EventsPage.css";
import PageLoader from "@components/loaders/PageLoader.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function EventsPage() {
  const { events, status } = useSelector((state) => state.eventList)
  const { userData } = useSelector((state) => state)
  const [categories, setCategories] = useState(null);
  const categoryList = categories ? Object.keys(categories) : [];
  const [renderCategory, setRenderCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    if (events) {
      const dataToCategories = getCategories(events);
      setCategories(dataToCategories);
    }
  }, [events]);

  return (
    <div className="flex flex-col w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado">
      <div className="flex justify-center items-center rounded-2xl w-full gap-5 pb-3 botonera">
        <button
          className={`rounded-2xl p-2 transition-colors duration-500 cursor-pointer borde-con-degradado
    ${
      renderCategory === "scheduled"
        ? "bg-purple-400 text-white shadow-md"
        : "hover:bg-purple-300"
    }`}
          onClick={() => setRenderCategory("scheduled")}
        >
          Misiones programadas
        </button>
        <div className="h-full rounded-2xl separator"></div>
        <button
          className={`rounded-2xl p-2 transition-colors duration-500 cursor-pointer borde-con-degradado
    ${
      renderCategory === "all"
        ? "bg-purple-400 text-white shadow-md"
        : "hover:bg-purple-300"
    }`}
          onClick={() => setRenderCategory("all")}
        >
          Mostrar todos
        </button>
        {categories ? (
          categoryList.map((key, index) => {
            const isActive = renderCategory === key;
            return (
              <button
                key={`${key}${index}`}
                className={`rounded-2xl p-2 transition-colors duration-500 cursor-pointer borde-con-degradado
            ${
              isActive
                ? "bg-purple-400 text-white shadow-md"
                : "hover:bg-purple-300"
            }`}
                onClick={() => setRenderCategory(key)}
              >
                {key}
              </button>
            );
          })
        ) : (
          <LoaderMini />
        )}
      </div>
      {status === 'succeeded' ? (
        <RenderEventList
          eventList={events}
          renderCategory={renderCategory}
          userId={userData?.id}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
          <PageLoader />
        </div>
      )}
    </div>
  );
}

export default EventsPage;
