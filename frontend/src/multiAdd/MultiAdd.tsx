import React, { useState, useEffect, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import MultiAddItem from "./MultiAddItem";
import InputBase from "@material-ui/core/InputBase";
import Context from "context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      width: "100%",
      margin: theme.spacing(0, 0, 3, 0),
    },
    addIcon: {
      cursor: "pointer",
    },
  })
);

interface IMultiAddProps {
  title: string;
  placeholder: string;
  defaultItems?: string[];
  callback: (items: string[]) => void;
}

function MultiAdd(props: IMultiAddProps) {
  const styles = useStyles();
  const [items, setItems] = useState<string[]>(props.defaultItems || []);
  const [currentInput, setCurrentInput] = useState<string>("");

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  function addItem() {
    if (currentInput === "") {
      return;
    }
    let newlist: string[] = items.concat(currentInput);
    setItems(newlist);
    setCurrentInput("");
  }

  function handleItemDelete(itemToRemove: string) {
    // this implementation will delete every item with the same name...
    // but is that really a bad thing? Otherwise we make items a lit of custom objects
    const newItems = items.filter((item) => item !== itemToRemove);
    setItems(newItems);
  }

  useEffect(() => {
    props.callback(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  /**
   * Enable addition for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  return (
    <div className={styles.flexContainer}>
      {isAdmin &&
        <InputBase
          placeholder={props.placeholder}
          onChange={(e) => setCurrentInput(e.target.value)}
          value={currentInput}
          onKeyDown={e => e.key === "Enter" && addItem()}
          endAdornment={
            <InputAdornment position="end">
              <AddIcon className={styles.addIcon} onClick={addItem} />
            </InputAdornment>
          }
        />
      }
      {items.map((item, i) => (
        <MultiAddItem name={item} onDelete={handleItemDelete} key={item} />
      ))}
    </div>
  );
}

export default MultiAdd;
