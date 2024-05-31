export interface People {
deletePeopleList(people: People): unknown;
    id: Number;
    username: String;
    email: String;

}

export interface State {
    peopleList: People[];
}
