# Effective Prompt Writing Guide for Module 1 Certification

## Why Good Prompts Matter
Clear, detailed prompts help AI assistants understand your needs and deliver better results. This guide will help you craft prompts that get the outcomes you want.

## Prompt Structure Template

### 1. Context & Background
**What to include:**
- What you're building (project type, purpose)
- Current state of the project
- Relevant constraints or requirements

**Example:**
```
I'm building a Module 1 Certification project - a portfolio website for a web designer. 
The project needs to showcase 5 projects with images, descriptions, and links. 
I'm using [technology/framework] and need it to be responsive.
```

### 2. Specific Task/Request
**What to include:**
- Exactly what you want done
- Where it fits in the project
- Any specific requirements

**Example:**
```
Create a responsive navigation component with:
- Logo on the left
- Menu items (Home, About, Portfolio, Contact) centered
- Mobile hamburger menu
- Smooth scroll behavior
```

### 3. Technical Details
**What to include:**
- Technologies/frameworks being used
- File structure preferences
- Code style or conventions
- Dependencies

**Example:**
```
Use React with TypeScript. Follow the existing component structure in /src/components.
Use Tailwind CSS for styling. Ensure accessibility (ARIA labels, keyboard navigation).
```

### 4. Constraints & Requirements
**What to include:**
- What NOT to do
- Limitations to consider
- Performance requirements
- Browser compatibility

**Example:**
```
Must work in Chrome, Firefox, and Safari. 
No external libraries beyond what's already installed.
Keep bundle size under 200KB.
```

### 5. Expected Outcome
**What to include:**
- What success looks like
- How to verify it works
- Any specific format needed

**Example:**
```
The component should be fully functional and match the design mockup.
Include unit tests using Jest. 
Document the props interface in JSDoc comments.
```

## Prompt Quality Checklist

Before sending a prompt, ask yourself:

### ✅ Context
- [ ] Is the project context clear?
- [ ] Are current file locations mentioned?
- [ ] Is the relationship to other parts clear?

### ✅ Specificity
- [ ] Is the task clearly defined?
- [ ] Are there specific requirements listed?
- [ ] Are examples or references provided?

### ✅ Technical Details
- [ ] Are technologies/frameworks specified?
- [ ] Are file paths or structure mentioned?
- [ ] Are coding standards included?

### ✅ Constraints
- [ ] Are limitations mentioned?
- [ ] Are "don't do" items listed?
- [ ] Are performance requirements clear?

### ✅ Verification
- [ ] Is the expected outcome described?
- [ ] Are testing requirements mentioned?
- [ ] Is the success criteria clear?

## Common Prompt Patterns

### Pattern 1: Feature Addition
```
Context: [What you're building]
Task: [Specific feature to add]
Location: [Where it goes]
Requirements: [Must-haves]
Example: [Reference or mockup]
```

### Pattern 2: Bug Fix
```
Context: [What's broken]
Current behavior: [What happens now]
Expected behavior: [What should happen]
Files involved: [Which files]
Steps to reproduce: [How to see the issue]
```

### Pattern 3: Refactoring
```
Context: [Current code structure]
Goal: [What to improve]
Constraints: [What to preserve]
Approach: [Preferred method]
```

### Pattern 4: Learning/Explanation
```
Context: [What you're working on]
Question: [What you want to understand]
Specific areas: [What to focus on]
Use case: [How you'll apply it]
```

## Example Prompts (Good vs. Better)

### ❌ Vague Prompt
```
"Make the website look better"
```

### ✅ Better Prompt
```
"I'm building a portfolio website for Module 1 Certification. 
The homepage needs a hero section with:
- Full-width background image
- Centered heading and subheading
- Call-to-action button
- Smooth fade-in animation on load

Use the existing Tailwind CSS setup. The hero should be responsive 
and work on mobile devices. Match the color scheme from the design 
system (primary: #3B82F6, secondary: #10B981).

File location: /src/components/Hero.tsx"
```

### ❌ Vague Prompt
```
"Fix the navigation"
```

### ✅ Better Prompt
```
"The navigation menu isn't working on mobile devices. 
When the hamburger icon is clicked, the menu should slide down, 
but currently nothing happens.

Files involved:
- /src/components/Navigation.tsx
- /src/styles/navigation.css

Expected behavior:
- Click hamburger → menu slides down
- Click again → menu slides up
- Menu items should be accessible via keyboard

Current tech stack: React, CSS modules. 
Please check the event handlers and CSS transitions."
```

## Tips for Better Prompts

1. **Be Specific**: "Add a contact form" → "Add a contact form with name, email, message fields, validation, and submit handler"

2. **Provide Context**: Mention related files, previous decisions, or project structure

3. **Include Examples**: Reference similar code, mockups, or patterns you want to follow

4. **State Constraints**: Mention what you can't change, what libraries to use/avoid, etc.

5. **Define Success**: Explain how you'll know it's done correctly

6. **Ask Questions**: If unsure, ask for clarification or options

7. **Iterate**: Start broad, then refine based on results

## Prompt Templates for This Project

### Template: Add New Feature
```
I'm working on my Module 1 Certification project: [PROJECT NAME].

I need to add a [FEATURE NAME] that [PURPOSE].

Requirements:
- [REQUIREMENT 1]
- [REQUIREMENT 2]
- [REQUIREMENT 3]

Technical details:
- Technology: [TECH]
- Location: [FILE/PATH]
- Should integrate with: [RELATED COMPONENTS]

Expected outcome:
[WHAT SUCCESS LOOKS LIKE]
```

### Template: Fix Issue
```
I'm working on my Module 1 Certification project: [PROJECT NAME].

There's an issue with [COMPONENT/FEATURE]:
- Current behavior: [WHAT HAPPENS NOW]
- Expected behavior: [WHAT SHOULD HAPPEN]

Files involved:
- [FILE 1]
- [FILE 2]

Steps to reproduce:
1. [STEP 1]
2. [STEP 2]

Technical context:
- [RELEVANT TECH DETAILS]
```

### Template: Refactor/Improve
```
I'm working on my Module 1 Certification project: [PROJECT NAME].

I want to improve [COMPONENT/FEATURE] by [GOAL].

Current implementation:
- [CURRENT APPROACH]
- [CURRENT ISSUES]

Desired improvements:
- [IMPROVEMENT 1]
- [IMPROVEMENT 2]

Constraints:
- [WHAT TO PRESERVE]
- [WHAT TO AVOID]
```

## Next Steps

1. Fill out the PROJECT_BRAINSTORM.md with your ideas
2. Use these templates when creating prompts
3. Review prompts using the checklist before sending
4. Iterate and refine based on results
