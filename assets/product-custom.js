$(document).ready(function () {
  $(".custom-tableforSize tr:even, .custom-tableforSize table").addClass(
    "swatches"
  );

  function sizeTotalUpdate() {
    var selectedValue = $(
      '[data-option-type="Color"] input[type="radio"]:checked'
    )
      .val()
      .toLowerCase();
    console.log(selectedValue);
    var modifiedValue = selectedValue.replace(/\s+/g, "-");

    $.ajax({
      url: window.location.href,
      success: function (response) {
        var updatedContent = $(response).find("product-images").html();
        setTimeout(function () {
          $(".product__slide, .product__thumb").each(function () {
            if ($(this).data("color") !== modifiedValue) {
              $(this).remove();
            }
          });
        }, 100);

        $("product-images").html(updatedContent);
        $("product-images").css("opacity", "1");
        $("product-images").css("visibility", "visible");

        function setupDragScroll(
          containerSelector,
          contentSelector,
          sensitivity = 1
        ) {
          const container = document.querySelector(containerSelector);
          const content = document.querySelector(contentSelector);
          let isDragging = false;
          let startX;
          let scrollLeft;

          container.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
          });

          container.addEventListener("mouseleave", () => {
            isDragging = false;
          });

          container.addEventListener("mouseup", () => {
            isDragging = false;
          });

          container.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            // Adjust the walk by the sensitivity factor
            const walk = (x - startX) * sensitivity; // Modify this line
            container.scrollLeft = scrollLeft - walk;
          });
        }

        setupDragScroll(".product__slides", ".product__slide", 3.5); // Adjust the third parameter as needed

        // Add more carousels as needed, with their respective container and content selectors.
      },
      error: function (xhr, status, error) {
        console.error("Error refreshing content: " + error);
      },
    });

    $("tr.swatches").css("--swatch", "var(--" + modifiedValue + ")");
    $(".custom-tableforSize table").css(
      "--swatch",
      "var(--" + modifiedValue + ")"
    );

    //if the swatch color if white than inverse color of size tables
    if (modifiedValue === "off-white") {
      $("tr.swatches").css("color", "#000");
    } else {
      $("tr.swatches").css("color", "#fff");
    }
    var totalInventory = 0;

    // Iterate over elements with the specified data-option2 attribute
    $(".all-product-variants [data-option1]").each(function () {
      // Check if the data-option2 attribute matches the selected color
      if ($(this).data("option1").toLowerCase() === selectedValue) {
        // Add the data-inventory value to the total
        totalInventory += parseInt($(this).data("inventory"));
      }
    });

    // Ensure totalInventory is not negative
    totalInventory = Math.max(totalInventory, 0);

    // Output the total inventory for the selected color
    console.log(totalInventory + " " + selectedValue + " Pieces remaining");
    $("#variant_total_num").html(
      totalInventory + " " + selectedValue + " Pieces"
    );
  }

  // On page load
  sizeTotalUpdate();

  // On input change
  $('[data-option-type="Color"] input[type="radio"]').change(function () {
    sizeTotalUpdate();
  });

  const variantName = $("#variant-name");
  const availableQuantity = $("#available-quantity");
  const inputElement = document.querySelector('input[name="id"]');

  function updateVariantName(value) {
    variantName.html(value);
  }

  function updateAvailableQuantity(value) {
    // Ensure the value is a non-negative number
    const newValue = Math.max(parseInt(value), 0);
    availableQuantity.html(newValue);
  }

  function handleInputChange() {
    const newValue = inputElement.value;
    const divElement = document.querySelector(`div[data-id="${newValue}"]`);

    if (divElement) {
      const dataInventoryValue = divElement.getAttribute("data-inventory");
      updateAvailableQuantity(dataInventoryValue);
    } else {
      console.log("Element with the specified data-id not found.");
    }
  }

  $('[data-option-type="Size"] input[type="radio"]').on("change", function () {
    if ($(this).is(":checked")) {
      console.log("Selected value: " + $(this).val());
      updateVariantName($(this).val());
    }
  });

  // Initial setup
  const initialVal = $(
    '[data-option-type="Size"] input[type="radio"]:checked'
  ).val(); // Ensure you get the value of the checked radio button
  updateVariantName(initialVal); // Update the variant name initially
  handleInputChange();

  const observer = new MutationObserver(function (mutationsList) {
    handleInputChange();
  });

  observer.observe(inputElement, { attributes: true });

  const inventoryDivs = document.querySelectorAll("div[inventorymanagment]");
  let totalSum = 0;

  inventoryDivs.forEach((div) => {
    const inventoryValue = parseInt(div.getAttribute("data-inventory"));
    totalSum += inventoryValue;
  });

  $("#total-inv-number").html(totalSum);
  console.log("Total Inventory:", totalSum);
});
