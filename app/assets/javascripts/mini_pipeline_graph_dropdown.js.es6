/* eslint-disable no-new */
/* global Flash */

/**
 * In each pipelines table we have a mini pipeline graph for each pipeline.
 *
 * When we click in a pipeline stage, we need to make an API call to get the
 * builds list to render in a dropdown.
 *
 * The container should be the table element.
 *
 * The stage icon clicked needs to have the following HTML structure:
 * <div class="dropdown">
 *   <button class="dropdown js-builds-dropdown-button" data-toggle="dropdown"></button>
 *   <div class="js-builds-dropdown-container dropdown-menu"></div>
 * </div>
 */
(() => {
  class MiniPipelineGraph {
    constructor(opts = {}) {
      this.container = opts.container || '';
      this.dropdownListSelector = '.js-builds-dropdown-container';
      this.getBuildsList = this.getBuildsList.bind(this);
    }

    /**
     * Adds the event listener when the dropdown is opened.
     * All dropdown events are fired at the .dropdown-menu's parent element.
     */
    bindEvents() {
      $(document).on('shown.bs.dropdown', this.container, this.getBuildsList);
    }

    /**
     * For the clicked stage, renders the given data in the dropdown list.
     *
     * @param  {HTMLElement} stageContainer
     * @param  {Object} data
     */
    renderBuildsList(stageContainer, data) {
      const dropdownContainer = stageContainer.parentElement.querySelector(
        `${this.dropdownListSelector} .js-builds-dropdown-list`,
      );

      dropdownContainer.innerHTML = data;
    }

    /**
     * For the clicked stage, gets the list of builds.
     *
     * All dropdown events have a relatedTarget property,
     * whose value is the toggling anchor element.
     *
     * @param  {Object} e bootstrap dropdown event
     * @return {Promise}
     */
    getBuildsList(e) {
      const button = e.relatedTarget;
      const endpoint = button.dataset.stageEndpoint;

      return $.ajax({
        dataType: 'json',
        type: 'GET',
        url: endpoint,
        beforeSend: () => {
          this.renderBuildsList(button, '');
          this.toggleLoading(button);
        },
        success: (data) => {
          this.toggleLoading(button);
          this.renderBuildsList(button, data.html);
        },
        error: () => {
          this.toggleLoading(button);
          new Flash('An error occurred while fetching the builds.', 'alert');
        },
      });
    }

    /**
     * Toggles the visibility of the loading icon.
     *
     * @param  {HTMLElement} stageContainer
     * @return {type}
     */
    toggleLoading(stageContainer) {
      stageContainer.parentElement.querySelector(
        `${this.dropdownListSelector} .js-builds-dropdown-loading`,
      ).classList.toggle('hidden');
    }
  }

  window.gl = window.gl || {};
  window.gl.MiniPipelineGraph = MiniPipelineGraph;
})();
