import { useState } from 'react';
import { greeting } from './Greeting';
import Dropdown from './Dropdown';

const OPTIONS_COUNT = 5
const OPTION_PREFIX = 'Option '

export default function App() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState('Option 1');

  const onOptionChange = optionCount => {
    setCount(optionCount);
    setValue(`${OPTION_PREFIX}${optionCount}`);
  }

  return (
    <>
      <h1>
        {greeting(__APP_NAME__)}
      </h1>
      <div className='card'>
        <h2>
          Card
        </h2>
        <Dropdown
          options={Array.from(Array(OPTIONS_COUNT), (_, i) => `${OPTION_PREFIX}${i + 1}`)}
          value={value}
          onChange={value => {
            onOptionChange(+value.replace(OPTION_PREFIX, ''))
          }}
        />
        <p className='card-description'>
          Lorem ipsum dolor sit amet,
          supra mutationem signate. 
          Nunc porta pulvinar lorem, a molestie elit vulputate nec. Maecenas vulputate fringilla
          mi, a posuere arcu tempor sit amet. Etiam porta nisi ut molestie hendrerit. Aenean luctus nibh vel sapien interdum, sit 
          amet cursus nunc
          aliquam. 
          Quisque rhoncus elementum sodales. Fusce placerat eros ut gravida rhoncus. Fusce pharetra, leo vitae dapibus faucibus, 
          dolor nisl placerat elit, eget dignissim odio tortor in dolor.
        </p>
        <button
          type='button'
          disabled={count >= OPTIONS_COUNT}
          onClick={() => {
            onOptionChange(count + 1)
          }}
        >
          Option <span>{count}</span> is selected
        </button>
      </div>
    </>
  );
}
