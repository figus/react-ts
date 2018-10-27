import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchStart = (props: any) =>
{
  return (
    <div>
      <FontAwesomeIcon size="10x" flip="horizontal"  icon={faSearch} />
    </div>
  );
};

export default SearchStart;
