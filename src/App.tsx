import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { ListComponent } from './components/ListComponent';
import ReactPaginate from 'react-paginate';
import './pagination.scss';
import { Loader } from './components/Loader';
import { About } from './components/About';

const App: React.FC = () => {
  const [timelineList, setTimelineList] = useState<TimelineItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<String>('All');
  const [filteredList, setFilteredList] = useState<TimelineItem[] | []>([]);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const fetchTimeline = () => {
    let xhr = new XMLHttpRequest();

    let url = 'https://arthurfrost.qflo.co.za/php/getTimeline.php';
    xhr.open("GET", url, true);
  
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        setTimelineList(JSON.parse(this.responseText).Timeline);
        setLoading(false);
      }
    }
  
    xhr.send();
  }

  useEffect(() => {
    fetchTimeline();
  }, []);

  useEffect(() => {
    const allCategories = timelineList.map((item) => item.Category)

    const uniqueCategories = allCategories.filter((value, index, self) => self.indexOf(value) === index && value);

    setCategories(uniqueCategories);
  }, [timelineList]);

  useEffect(() => {
    const newList = [...timelineList].filter((item) => item.Category === selectedCategory);

    if (selectedCategory === 'All') {
      setFilteredList(timelineList);
    } else {
      setFilteredList(newList);
    }
  }, [selectedCategory, timelineList]);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredList.length / itemsPerPage);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__top">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="logo"
            className='app__logo'
          />

          <h1 className="app__title">Dr. Arthur Frost</h1>
        </div>

        <About />

        <h2 className="app__heading">Dr Arthur's Timeline</h2>

        <div className="app__container">
          <div className='app__filters'>
              <select
                name="items-per-page"
                id="items-per-page"
                defaultValue={"0"}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                }}
                className="app__filters-select"
              >
                <option value="0" disabled>Select the number of items per page</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>

              <select
                name="categories"
                id="categories"
                defaultValue={"0"}
                onChange={(event) => {
                  setSelectedCategory(event.target.value)
                }}
                className="app__filters-select"
              >
                <option value="0" disabled>Select Category</option>
                <option value="All">All</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
          </div>

          {loading
            ? (<Loader />)
            : (<ListComponent timelineList={currentItems} />)
          }

          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"item active"}
            disabledClassName={"disabled-page"}
            breakLabel="..."
            breakClassName={"item"}
            nextLabel=">"
            nextClassName={"item next"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={windowSize.current[0] < 600 ? 3 : 5}
            pageCount={pageCount}
            pageClassName={"item pagination-page"}
            previousLabel="<"
            previousClassName={"item previous"}
            renderOnZeroPageCount={null}
          />
        </div>

        {/* {loading
          ? (<Loader />)
          : (
          <div className="app__container">
            <div className='app__filters'>
              <select
                name="items-per-page"
                id="items-per-page"
                defaultValue={"0"}
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                }}
                className="app__filters-select"
              >
                <option value="0" disabled>Select the number of items per page</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>

              <select
                name="categories"
                id="categories"
                defaultValue={"0"}
                onChange={(event) => {
                  setSelectedCategory(event.target.value)
                }}
                className="app__filters-select"
              >
                <option value="0" disabled>Select Category</option>
                <option value="All">All</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>

            <ListComponent timelineList={currentItems} />

            <ReactPaginate
              containerClassName={"pagination"}
              activeClassName={"item active"}
              disabledClassName={"disabled-page"}
              breakLabel="..."
              breakClassName={"item"}
              nextLabel=">"
              nextClassName={"item next"}
              onPageChange={handlePageClick}
              pageRangeDisplayed={windowSize.current[0] < 600 ? 3 : 5}
              pageCount={pageCount}
              pageClassName={"item pagination-page"}
              previousLabel="<"
              previousClassName={"item previous"}
              renderOnZeroPageCount={null}
            />
          </div>
          )
        } */}
      </div>
    </div>
  );
}

export default App;
