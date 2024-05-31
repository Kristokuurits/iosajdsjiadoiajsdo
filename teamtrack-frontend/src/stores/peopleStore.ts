import { People } from "@/models/People";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "@/models/api";

export const usePeopleStore = defineStore('peopleStore', () => {
    const apiGetPeopleLists = useApi<People[]>('people');
    const peopleLists = ref<People[]>([]);
    let allPeopleLists: People[] = [];

    const loadPeopleLists = async () => {
        await apiGetPeopleLists.request();

        if (apiGetPeopleLists.response.value) {
            return apiGetPeopleLists.response.value;
        }
        return [];
    };

    const load = async () => {
        allPeopleLists = await loadPeopleLists();
        peopleLists.value = allPeopleLists;
    };
    const getEventById = (id: number) => {
        return allPeopleLists.find((peopleList) => peopleList.id === id);
    };


    const addPeopleList = async (peopleList: People) => {
        const apiAddPeopleList = useApi<People>('people', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(peopleList),
        });

        await apiAddPeopleList.request();
        if (apiAddPeopleList.response.value) {
            load();
        }
    };
    const updatePeopleList = async (peopleList: People) => {
        const apiUpdatePeopleList = useApi<People>('people/' + peopleList.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(peopleList),
        });

        await apiUpdatePeopleList.request();
        if (apiUpdatePeopleList.response.value) {
            load();
        }
    };
    

    const deletePeopleList = async (peopleList: People) => {
        const deletePeopleListRequest = useApiRawRequest(`people/${peopleList.id}`, {
            method: 'DELETE',
        });

        const res = await deletePeopleListRequest();

        if (res.status === 204) {
            let id = peopleLists.value.indexOf(peopleList);

            if (id !== -1) {
                peopleLists.value.splice(id, 1);
            }

            id = peopleLists.value.indexOf(peopleList);

            if (id !== -1) {
                peopleLists.value.splice(id, 1);
            }
        }
    };

    return { peopleLists, load, getEventById, addPeopleList, updatePeopleList, deletePeopleList };
});