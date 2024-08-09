import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFiltersContext } from "../context/FiltersContext";
import React, { useState } from "react";

export function Filters() {
  const { filters, setFilters } = useFiltersContext();
  const [selectedFilter, setSelectedFilter] = useState(
    filters.date ? "date" : filters.priority ? "priority" : ""
  );

  const onChange = (value) => {
    setSelectedFilter(value);
    setFilters((prevFilters) => ({
      date: value === "date" ? "true" : "false",
      priority: value === "priority" ? "true" : "false",
    }));
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={onChange}
        style={styles.picker}
      >
        <Picker.Item label="Date" value="date" />
        <Picker.Item label="Priority" value="priority" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  picker: {
    width: 150,
    backgroundColor: "lightgray",
    borderRadius: 5,
  },
});
