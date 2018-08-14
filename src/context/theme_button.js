import {ThemeContext} from './GlobalContext';
import React from '../../../../AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';
function ThemedButton(props) {
    console.log(props);
    console.log(ThemeContext)
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background}}
        />

      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;