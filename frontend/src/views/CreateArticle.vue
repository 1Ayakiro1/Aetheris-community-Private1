<template>
  <div class="create-article-container">
    <!-- Body -->
    <div class="content-wrapper">
      <!-- Path block -->
      <div class="path-block">
        <h2 class="path-title">Create theme in: <a href="#" class="path-link">path</a></h2>
      </div>
      
      <!-- Warning block -->
      <div class="warning-block">
        <h2 class="warning-title">Before making an article, read the section rules</h2>
        <h2 class="warning-subtitle">For violation of the rules your article may be restricted or deleted.</h2>
        <button class="read-rules-button">Read the rules</button>
      </div>
      
      <!-- Edit block -->
      <div class="edit-block">
        <h2 class="edit-title">Article title</h2>
        <h2 class="edit-subtitle">Give a brief description of the article</h2>
        <input type="text" placeholder="Enter title..." class="title-input">
        
        <!-- Article editor block -->
        <div class="article-editor">
          <!-- Tools panel -->
          <div class="tools-panel">
            <img class="tool-icon" src="@/assets/imgs/eraser.png" alt="Eraser" />
            <img class="tool-icon" src="@/assets/imgs/italic.png" alt="Italic" />
            <img class="tool-icon bold-icon" src="@/assets/imgs/bold.png" alt="Bold" />
            <img class="tool-icon" src="@/assets/imgs/left_side.png" alt="Left Align" />
            <img class="tool-icon" src="@/assets/imgs/center_side.png" alt="Center Align" />
            <img class="tool-icon" src="@/assets/imgs/right_side.png" alt="Right Align" />
            <img class="tool-icon" src="@/assets/imgs/link.png" alt="Link" />
            <img class="tool-icon code-icon" src="@/assets/imgs/code.png" alt="Code" />
            <img class="tool-icon" src="@/assets/imgs/img.png" alt="Image" />
            <img class="tool-icon" src="@/assets/imgs/hide.png" alt="Hide" />
            <img class="tool-icon file-icon" src="@/assets/imgs/file1.png" alt="File" />
            <img class="tool-icon book-icon" src="@/assets/imgs/book.png" alt="Book" />
            <img class="tool-icon zoom-icon" src="@/assets/imgs/zoom.png" alt="Zoom" />
          </div>
          <div class="editor-divider"></div>
        </div>
        
        <h2 class="tags-title">Tags</h2>
        <h2 class="tags-subtitle">Add a tag for better promotion of the article</h2>
        <input type="text" placeholder="Enter tags..." class="tags-input">
        
        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="create-button">
            <img class="button-icon" src="@/assets/imgs/edit.png" alt="Edit" />
            <p class="button-text">Create</p>
          </button>
          <button class="preview-button">
            <img class="button-icon" src="@/assets/imgs/eye.png" alt="Eye" />
            <p class="button-text">Preview</p>
          </button>
          <button class="draft-button">
            <img class="button-icon" src="@/assets/imgs/archive.png" alt="Archive" />
            <p class="button-text">Save in draft</p>
          </button>
        </div>
        
        <!-- Publication time -->
        <div class="publication-time-section">
          <div class="publication-time-header">
            <div class="checkbox-item">
              <div class="checkbox"></div>
              <p class="checkbox-label">Publication time</p>
            </div>
          </div>
          <h2 class="publication-subtitle">Add a tag for better promotion of the article</h2>
          <div class="time-inputs">
            <button class="date-input">ddmmyy</button>
            <button class="time-input">00:00 am/pm</button>
          </div>
          <p class="publication-label">Publication time</p>
        </div>
        
        <!-- Ranks section -->
        <div class="ranks-section">
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">rank</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">rank</p>
          </div>
        </div>
        
        <!-- Additional settings -->
        <p class="additional-settings-title">Additional settings</p>
        <div class="additional-settings">
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">Disable commenting</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">Do not notify about article release</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">Hide contacts</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">Hide commentators info</p>
          </div>
          <div class="checkbox-item">
            <div class="checkbox"></div>
            <p class="checkbox-label">Disable replying to comments</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style lang="scss" scoped>
.create-article-container {
  max-width: 1920px;
  margin: 0 auto;
  background-color: var(--bg-primary);
  padding-top: 100px;
  padding-bottom: 200px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

// Path block
.path-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  height: 101px;
  border-radius: 25px;
}

.path-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.path-link {
  color: var(--primary-violet);
  text-decoration: none;
}

// Warning block
.warning-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  height: 209px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.warning-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.warning-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 4px;
  margin-left: 48px;
  width: 440px;
}

.read-rules-button {
  width: 269px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  margin-top: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
}

// Edit block
.edit-block {
  background-color: var(--bg-secondary);
  width: 1400px;
  height: 2000px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.edit-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.edit-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  width: 400px;
}

.title-input {
  width: 1300px;
  height: 68px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  margin-top: 8px;
  margin-left: 48px;
  font-weight: bold;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 22px;
  color: var(--text-primary);
  
  &::placeholder {
    color: var(--text-third);
  }
}

// Article editor
.article-editor {
  background-color: var(--btn-primary);
  width: 1300px;
  height: 734px;
  margin-top: 56px;
  margin-left: 48px;
  border-radius: 20px;
}

.tools-panel {
  width: 100%;
  height: 77px;
  display: flex;
  align-items: center;
  gap: 32px;
  padding-left: 66px; // 16px + 50px = 66px
  padding-right: 16px;
}

.tool-icon {
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  padding: 4px;
  
  &:hover {
    background-color: rgba(67, 73, 86, 0.3);
    opacity: 0.8;
  }
  
  &.bold-icon {
    width: 30px;
    height: 36px;
  }
  
  &.code-icon {
    width: 50px;
    height: 33px;
  }
  
  &.file-icon {
    width: 34px;
    height: 40px;
  }
  
  &.book-icon {
    width: 40px;
    height: 35px;
    margin-left: auto;
  }
  
  &.zoom-icon {
    width: 35px;
    height: 35px;
    margin-right: 16px;
  }
}

.editor-divider {
  height: 2px;
  width: 1200px;
  background-color: var(--bg-primary);
  margin-left: 48px;
}

// Tags section
.tags-title {
  color: var(--text-primary);
  font-size: 30px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 24px;
  margin-left: 48px;
}

.tags-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 48px;
  width: 460px;
}

.tags-input {
  width: 1300px;
  height: 68px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  margin-top: 16px;
  margin-left: 48px;
  font-weight: bold;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 22px;
  color: var(--text-primary);
  
  &::placeholder {
    color: var(--text-third);
  }
}

// Action buttons
.action-buttons {
  width: 100%;
  display: flex;
  gap: 4px;
}

.create-button {
  width: 269px;
  height: 56px;
  background: linear-gradient(to right, var(--primary-violet) 0%, var(--primary-pink) 100%);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 48px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding-left: 32px;
  
  &:hover {
    opacity: 0.8;
  }
}

.preview-button {
  width: 280px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 16px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding-left: 32px;
  
  &:hover {
    opacity: 0.8;
  }
}

.draft-button {
  width: 290px;
  height: 56px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-size: 25px;
  display: flex;
  margin-left: 16px;
  margin-top: 16px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding-left: 32px;
  
  &:hover {
    opacity: 0.8;
  }
}

.button-icon {
  width: 30px;
  height: 30px;
  
  .preview-button & {
    width: 35px;
    height: 25px;
  }
  
  .draft-button & {
    width: 34px;
    height: 30px;
  }
}

.button-text {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 20px;
}

// Publication time section
.publication-time-section {
  width: 100%;
  margin-top: 48px;
}

.publication-time-header {
  display: flex;
  align-items: center;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 4px solid #6b7280;
  background-color: transparent;
  margin-left: 48px;
}

.checkbox-label {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-left: 8px;
}

.publication-subtitle {
  color: var(--text-secondary);
  font-size: 20px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 4px;
  margin-left: 48px;
  width: 460px;
}

.time-inputs {
  display: flex;
  margin-top: 16px;
  margin-left: 48px;
  gap: 24px;
}

.date-input {
  width: 400px;
  height: 65px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: var(--text-third);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
}

.time-input {
  width: 300px;
  height: 65px;
  background-color: var(--btn-primary);
  border: none;
  border-radius: 20px;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: var(--text-third);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    opacity: 0.8;
  }
}

.publication-label {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 32px;
  margin-left: 48px;
}

// Ranks section
.ranks-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

// Additional settings
.additional-settings-title {
  color: var(--text-primary);
  font-size: 25px;
  font-family: var(--font-sans);
  font-weight: bold;
  margin-top: 32px;
  margin-left: 48px;
}

.additional-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}
</style>