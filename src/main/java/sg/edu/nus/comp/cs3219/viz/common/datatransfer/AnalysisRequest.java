package sg.edu.nus.comp.cs3219.viz.common.datatransfer;

import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

public class AnalysisRequest {

    @NotEmpty
    private String dataSet;

    private List<Selection> selections = new ArrayList<>();

    @NotEmpty
    private List<Record> involvedRecords = new ArrayList<>();

    private List<Filter> filters = new ArrayList<>();

    private List<Joiner> joiners = new ArrayList<>();


    public static class Selection {
        private String field;

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }
    }

    public static class Record {
        private String name;

        public void setName(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public static class Filter {
        private String field;
        private String comparator;
        private String value;

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getComparator() {
            return comparator;
        }

        public void setComparator(String comparator) {
            this.comparator = comparator;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }
    }

    public static class Joiner {
        private String left;
        private String right;

        public String getLeft() {
            return left;
        }

        public void setLeft(String left) {
            this.left = left;
        }

        public String getRight() {
            return right;
        }

        public void setRight(String right) {
            this.right = right;
        }
    }

    public void setDataSet(String dataSet) {
        this.dataSet = dataSet;
    }

    public void setSelections(List<Selection> selections) {
        this.selections = selections;
    }

    public void setInvolvedRecords(List<Record> involvedRecords) {
        this.involvedRecords = involvedRecords;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public String getDataSet() {
        return dataSet;
    }

    public List<Selection> getSelections() {
        return selections;
    }

    public List<Record> getInvolvedRecords() {
        return involvedRecords;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public List<Joiner> getJoiners() {
        return joiners;
    }

    public void setJoiners(List<Joiner> joiners) {
        this.joiners = joiners;
    }
}
