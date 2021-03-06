// axios already imported at app.js
const state = {
    bugs: [],
    bug_details: {
        project: {},
        assigned_to: {},
        added_by: {},
        comments: []
    }
};
const getters = {
    bugs: state => state.bugs,
    bug_details: state => state.bug_details
};
const actions = {
    getBugs: async ({ commit }) => {
        try {
            const result = await axios.get("api_web_session/v1/bugs");
            commit("setBugs", result.data);
            // console.log(result);
        } catch (error) {
            alert(error);
            // console.log(error.response);
        }
    },
    newBug: async ({ commit }, bug) => {
        // we append our data
        let formData = new FormData();

        formData.append("title", bug.title);
        formData.append("project_id", bug.project);
        formData.append("description", bug.description);
        formData.append("browser", bug.browser);
        formData.append("os", bug.os);
        formData.append("bug_type", bug.type);
        formData.append("severity", bug.severity);
        formData.append("priority", bug.priority);
        formData.append("developer", bug.developer);
        if (bug.image) {
            formData.append("image", bug.image);
        }
        try {
            const result = await axios.post(
                "api_web_session/v1/bugs",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "content-type": "multipart/form-data"
                    }
                }
            );
            commit("insertBug", result.data);
            // alert(`${result.statusText},a Bug is successfuly added.`);
            // console.log(result);
        } catch (error) {
            // console.log(error.response);
            throw error
        }
    },
    getBugDetails: async ({ commit }, id) => {
        try {
            const result = await axios.get(`api_web_session/v1/bugs/${id}`);
            // console.log(result);
            commit("setBugDetails", result.data);
        } catch (error) {
            alert(error);
            // console.log(error.response);
        }
    },
    clearBugDetails: ({ commit }) => {
        // console.log("remove...");
        commit("removeBugDetails");
    },
    editBugDetails: async ({ commit }, bug) => {

        let formData = new FormData();

        formData.append("id", bug.id);
        formData.append("title", bug.title);
        formData.append("project_id", bug.project);
        formData.append("description", bug.description);
        formData.append("browser", bug.browser);
        formData.append("os", bug.os);
        formData.append("bug_type", bug.type);
        formData.append("severity", bug.severity);
        formData.append("priority", bug.priority);
        formData.append("developer", bug.developer);
        if (bug.image) {
            formData.append("image", bug.image);
        }
        try {
            const result = await axios.post(
                `api_web_session/v1/bugs/${bug.id}`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "content-type": "multipart/form-data"
                    }
                }
            );
            commit("setBugDetails", result.data);
            commit("updateBug", result.data);
        } catch (error) {
            console.log(error.response);
            alert(error);
        }
    },
    changeBugStatus: async ({ commit }, id) => {
        try {
            const result = await axios.post(`api_web_session/v1/bugs/status/${id}`, {
                id: id
            });
            // console.log(result)
            commit("setBugDetails", result.data);
            commit("updateBug", result.data);
        } catch (error) {
            // console.log(error);
            throw error
        }
    },
    deleteBug: async ({ commit }, id) => {
        try {
            await axios.delete(`api_web_session/v1/bugs/${id}`);
            commit("removeBug", id);
        } catch (error) {
            throw error
        }
    },
    addBugComment: async ({ commit }, comment) => {
        try {
            const result = await axios.post('api_web_session/v1/comments', {
                bug_id: comment.bug_id,
                message: comment.message
            });
            // console.log(result);
            commit("insertBugComment", result.data);
        } catch (error) {
            alert(error);
            // console.log(error.response);
        }
    },
    deleteBugComment: async ({ commit }, id) => {
        try {
            await axios.delete(`api_web_session/v1/comments/${id}`);
            // console.log(result);
            commit("removeBugComment", id);
        } catch (error) {
            // console.log(error.response);
            throw error;

        }
    }
};
const mutations = {
    setBugs: (state, bugs) => (state.bugs = bugs),
    insertBug: (state, bug) => state.bugs.unshift(bug),
    removeBug: (state, id) => state.bugs = state.bugs.filter(bug => bug.id != id),
    setBugDetails: (state, bug_details) => {
        state.bug_details = bug_details;
    },
    updateBug: (state, updated_bug) => {
        const found_bug = state.bugs.find(bug => bug.id === updated_bug.id);
        if (found_bug) {
            found_bug.title = updated_bug.title;
            found_bug.project.name = updated_bug.project.name;
            found_bug.assigned_to = updated_bug.assigned_to;
            found_bug.priority = updated_bug.priority;
            found_bug.severity = updated_bug.severity;
            found_bug.is_fixed = updated_bug.is_fixed;
            found_bug.created_at = updated_bug.created_at;
        }

    },
    removeBugDetails: state =>
        (state.bug_details = {
            project: {},
            assigned_to: {},
            added_by: {},
            comments: [],
        }),
    insertBugComment: (state, comment) => state.bug_details.comments.unshift(comment),
    removeBugComment: (state, id) => state.bug_details.comments = state.bug_details.comments.filter((comment) => comment.id != id),

};

export default {
    state,
    getters,
    actions,
    mutations
};
