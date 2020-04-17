# rn-sliding-button-panel

A side panel for React-Native with a button to slide and show/hide the panel at the side of the screen



## Installation

Use npm or yarn to add the package

```bash
npm i rn-sliding-button-panel

or

yarn add rn-sliding-button-panel
```

## Usage

```
<SlidingButtonPanel
          panelBackgroundColor={'rgba(40,60,90,0.8)'}
          openBtnBackgroundColor={'rgba(40,60,90,0.8)'}
          btnSeparatorColor={'black'}
          buttons={[
            {
              uri: 'ic_right',
              onPress: () => {},
            },
            {
              uri: 'ic_wrong',
              onPress: () => {
                alert();
              },
            },
          ]}
        />
```



## License
MIT