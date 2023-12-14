import React, { useEffect, useState } from 'react';
import './App.scss';
import { ListComponent } from './components/ListComponent';
import ReactPaginate from 'react-paginate';
import './pagination.scss';
import { Loader } from './components/Loader';

const App: React.FC = () => {
  const [timelineList, setTimelineList] = useState<TimelineItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [rangeDisplayed, setRangeDisplayed] = useState(5);

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

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = timelineList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(timelineList.length / itemsPerPage);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % timelineList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__top">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" />
          <h1 className="app__title">Dr. Arthur Frost's Teachings</h1>
        </div>

        {loading
          ? (<Loader />)
          : (
          <div className="app__container">
            <div className='app__filters'>
              <select
                name="items-per-page"
                id="items-per-page"
                onChange={(event) => {
                  setItemsPerPage(Number(event.target.value))
                }}
                className="app__filters-select"
              >
                <option selected disabled hidden>Choose the number of items per page</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
              </select>

              <select
                name="range-displayed"
                id="range-displayed"
                onChange={(event) => {
                  setRangeDisplayed(Number(event.target.value))
                }}
                className="app__filters-select"
              >
                <option selected disabled hidden>Choose the range displayed</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
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
              pageRangeDisplayed={rangeDisplayed}
              pageCount={pageCount}
              pageClassName={"item pagination-page"}
              previousLabel="<"
              previousClassName={"item previous"}
              renderOnZeroPageCount={null}
            />
          </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
