function CategoryFilter({ category, setCategory }) {

  const categories = [
    "All",
    "Read Later",
    "Work",
    "Personal",
    "Idea"
  ];

  return (
    <div className="category-filter">

      {categories.map((item) => (

        <button
          key={item}
          className={
            category === item
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => setCategory(item)}
        >
          {item}
        </button>

      ))}

    </div>
  );
}

export default CategoryFilter;