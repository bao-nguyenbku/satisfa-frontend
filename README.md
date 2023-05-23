# Theme ?
Text color: slate-800 <br />
Background color: neutral-200

# How to fetch data from server?
```javascript
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(categoryApi.endpoints.getAllCategory.initiate());
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);
```