
const eslint = require('eslint');
const rule = require('./rule');

const ruleTester = new eslint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
});
ruleTester.run('warn-unused-classes', rule, {
  valid: [
    // vanilla - hook is named `useStyles`, instantiated as `classes`
    `const useStyles = makeStyles(() => ({
      testClass: {
        backgroundColor: 'red'
      }
    }))
    
    const Component = () => {
      const classes = useStyles()
      return <div className={classes.testClass}>test</div>
    }`,

    // 1 level of abstraction - not instantiated as `classes`
    `const useStyles = makeStyles(() => ({
      testClass: {
        backgroundColor: 'red'
      }
    }))
    
    const Component = () => {
      const otherName = useStyles()
      return <div className={otherName.testClass}>test</div>
    }`,

    // 1 levels of abstraction - hook is named differently
    `const useMuiClasses = makeStyles(() => ({
      testClass: {
        backgroundColor: 'red'
      }
    }))
    
    const Component = () => {
      const classes = useMuiClasses()
      return <div className={classes.testClass}>test</div>
    }`,

    // 2 levels of abstraction - both hook and instantiation named differently
    `const useMuiClasses = makeStyles(() => ({
      testClass: {
        backgroundColor: 'red'
      }
    }))
    
    const Component = () => {
      const muiClasses = useMuiClasses()
      return <div className={muiClasses.testClass}>test</div>
    }`,
  ],
  invalid: [
    // vanilla - hook is named `useStyles`, instantiated as `classes`
    {
      code: `const useStyles = makeStyles(() => ({
        testClass: {
          backgroundColor: 'red'
        }
      }))
      
      const Component = () => {
        const classes = useStyles()
        return <div>test</div>
      }`,
      errors: [{
        message: 'Class `testClass` is unused'
      }]
    },

    // 1 level of abstraction - not instantiated as `classes`
    {
      code: `const useStyles = makeStyles(() => ({
        testClass: {
          backgroundColor: 'red'
        }
      }))
      
      const Component = () => {
        const otherName = useStyles()
        return <div>test</div>
      }`,
      errors: [{
        message: 'Class `testClass` is unused'
      }]
    },


    // 1 levels of abstraction - hook is named differently
    {
      code: `const useMuiClasses = makeStyles(() => ({
        testClass: {
          backgroundColor: 'red'
        }
      }))
      
      const Component = () => {
        const classes = useMuiClasses()
        return <div>test</div>
      }`,
      errors: [{
        message: 'Class `testClass` is unused'
      }]
    },
    

    // 2 levels of abstraction - both hook and instantiation named differently
    {
      code: `const useMuiClasses = makeStyles(() => ({
        testClass: {
          backgroundColor: 'red'
        }
      }))
      
      const Component = () => {
        const muiClasses = useMuiClasses()
        return <div>test</div>
      }`,
      errors: [{
        message: 'Class `testClass` is unused'
      }]
    }
  ],
});