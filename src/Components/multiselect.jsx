import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
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

    selectCategory(typeof value === "string" ? value.split(",") : value);
  };
  const { t } = useTranslation();
  return (
    <div>
      <FormControl required sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          {t("Categories")}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label={t("Categories")} />}
          renderValue={(selected) => {
            const selectedNames = categories
              .filter((category) => selected.includes(category.category_id))
              .map((category) => t(category.category_name));
            return selectedNames.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {categories?.map((item) => (
            <MenuItem key={item.category_id} value={item.category_id}>
              <Checkbox
                checked={selectedCategories.indexOf(item.category_id) > -1}
              />
              <ListItemText primary={t(item.category_name)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
