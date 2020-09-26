
function RefNode(refId, component, ref, tag) {
  this.epochRefId = refId;
  this.component = component;
  this.next = null;
  this.ref = ref
  this.epochRefTag = tag;
};

function EpochRefList() {
  let nextId = 1;
  this.head = null;
  this.tail = null;
  
  Object.defineProperties(this, {
    nextRefId : {
      get() {return nextId},
      set(x) {nextId = nextId += 1}
    }
  })
};

EpochRefList.prototype.addRef = function(component, ref, refId, tag) {
  const newRefNode = new RefNode(refId, component, ref, tag);
  if(!this.head) {
    this.head = newRefNode;
    this.tail = this.head;
    return newRefNode
  }
  this.tail.next = newRefNode;
  this.tail = newRefNode;
  return newRefNode;
}

EpochRefList.prototype.claimRefId = function() {
  const refId = this.nextRefId;
  this.nextRefId += 1;
  return refId
}

export default EpochRefList;