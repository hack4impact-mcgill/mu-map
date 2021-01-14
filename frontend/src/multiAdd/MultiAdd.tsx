import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import MultiAddItem from "./MultiAddItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "195px",
      margin: theme.spacing(1),
    },
    addIcon: {
      cursor: "pointer",
    },
  })
);

interface IMultiAddProps {
  title: string;
  placeholder: string;
  callback: (items: string[]) => void;
}

function MultiAdd(props: IMultiAddProps) {
  const styles = useStyles();
  const [items, setItems] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");

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

  return (
    <div className={styles.flexContainer}>
      <Input
        placeholder={props.placeholder}
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
        endAdornment={
          <InputAdornment position="end">
            <AddIcon className={styles.addIcon} onClick={addItem} />
          </InputAdornment>
        }
      />
      {items.map((item, i) => (
        <MultiAddItem name={item} onDelete={handleItemDelete} key={item} />
      ))}
    </div>
  );
}

export default MultiAdd;
