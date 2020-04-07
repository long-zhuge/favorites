import React, { useState, useEffect } from 'react';
import navList from './navList.json';
import SearchInput from './SearchInput';
import List from './List';

export default () => {
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <SearchInput dataSource={navList} callback={(res) => { setSearchData(res) }} />
      <List dataSource={searchData || navList} />
    </React.Fragment>
  );
}
