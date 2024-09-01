import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({
  categories,
  selectedCategories,
  selectCategory,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // Update selected categories based on ids
    selectCategory(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl required sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => {
            const selectedNames = categories
              .filter((category) => selected.includes(category.category_id))
              .map((category) => category.category_name);
            return selectedNames.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {categories?.map((item) => (
            <MenuItem key={item.category_id} value={item.category_id}>
              <Checkbox
                checked={selectedCategories.indexOf(item.category_id) > -1}
              />
              <ListItemText primary={item.category_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
