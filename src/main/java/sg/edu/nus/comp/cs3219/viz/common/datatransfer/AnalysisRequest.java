package sg.edu.nus.comp.cs3219.viz.common.datatransfer;

import sg.edu.nus.comp.cs3219.viz.common.entity.PresentationSection;

import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

public class AnalysisRequest {

    @NotEmpty
    private String dataSet;

    private List<PresentationSection.Selection> selections = new ArrayList<>();

    @NotEmpty
    private List<PresentationSection.Record> involvedRecords = new ArrayList<>();

    private List<PresentationSection.Filter> filters = new ArrayList<>();

    private List<PresentationSection.Joiner> joiners = new ArrayList<>();

    private List<PresentationSection.Grouper> groupers = new ArrayList<>();

    private List<PresentationSection.Sorter> sorters = new ArrayList<>();

    public void setDataSet(String dataSet) {
        this.dataSet = dataSet;
    }

    public void setSelections(List<PresentationSection.Selection> selections) {
        this.selections = selections;
    }

    public void setInvolvedRecords(List<PresentationSection.Record> involvedRecords) {
        this.involvedRecords = involvedRecords;
    }

    public void setFilters(List<PresentationSection.Filter> filters) {
        this.filters = filters;
    }

    public String getDataSet() {
        return dataSet;
    }

    public List<PresentationSection.Selection> getSelections() {
        return selections;
    }

    public List<PresentationSection.Record> getInvolvedRecords() {
        return involvedRecords;
    }

    public List<PresentationSection.Filter> getFilters() {
        return filters;
    }

    public List<PresentationSection.Joiner> getJoiners() {
        return joiners;
    }

    public void setJoiners(List<PresentationSection.Joiner> joiners) {
        this.joiners = joiners;
    }

    public List<PresentationSection.Grouper> getGroupers() {
        return groupers;
    }

    public void setGroupers(List<PresentationSection.Grouper> groupers) {
        this.groupers = groupers;
    }

    public List<PresentationSection.Sorter> getSorters() {
        return sorters;
    }

    public void setSorters(List<PresentationSection.Sorter> sorters) {
        this.sorters = sorters;
    }
}
